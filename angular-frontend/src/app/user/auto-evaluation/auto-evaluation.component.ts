import { Component, OnInit } from '@angular/core';
import { AutoEvaluationService, AutoEvaluation } from './auto-evaluation.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auto-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Auto-évaluations</h2>

    <!-- Formulaire d'ajout -->
    <form (ngSubmit)="creerAutoEvaluation(evalForm)" #evalForm="ngForm">
      <div class="form-group">
        <label for="commentaire">Commentaire</label>
        <textarea [(ngModel)]="nouvelle.commentaire" name="commentaire" id="commentaire"
                  placeholder="Votre commentaire..." required #commentaireInput="ngModel"
                  rows="3"></textarea>
        <div *ngIf="commentaireInput.invalid && (commentaireInput.dirty || commentaireInput.touched)" class="error-message">
          Un commentaire est requis (minimum 10 caractères)
        </div>
      </div>

      <div class="form-group">
        <label for="note">Note</label>
        <input [(ngModel)]="nouvelle.note" name="note" id="note" type="number" 
              min="0" max="20" step="0.5" placeholder="0-20" required #noteInput="ngModel">
        <div *ngIf="noteInput.invalid && (noteInput.dirty || noteInput.touched)" class="error-message">
          <div *ngIf="noteInput.errors?.['required']">La note est requise</div>
          <div *ngIf="noteInput.errors?.['min'] || noteInput.errors?.['max']">
            La note doit être entre 0 et 20
          </div>
        </div>
      </div>

      <button type="submit" [disabled]="evalForm.invalid || isLoading">
        {{ isLoading ? 'Envoi en cours...' : 'Soumettre' }}
      </button>
      <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>

    <!-- Barre de recherche et tri -->
    <div class="controls">
      <input [(ngModel)]="searchText" (input)="filtrerEvaluations()" 
            placeholder="Rechercher dans les commentaires..." class="search">
      
      <div class="sort-options">
        <span>Trier par :</span>
        <button (click)="trierPar('date')" [class.active]="triActif === 'date'">Date</button>
        <button (click)="trierPar('note')" [class.active]="triActif === 'note'">Note</button>
      </div>
    </div>

    <!-- Liste des évaluations -->
    <div *ngIf="isLoadingEvaluations; else contentArea" class="loading">
      Chargement en cours...
    </div>

    <ng-template #contentArea>
      <ul *ngIf="evaluationsFiltrees.length; else noEvaluations">
  <li *ngFor="let eval of evaluationsFiltrees" class="evaluation-card">
    <div class="evaluation-header">
      <span class="note" 
        [class.high]="eval.note !== undefined && eval.note >= 16"
        [class.medium]="eval.note !== undefined && eval.note >= 10 && eval.note < 16"
        [class.low]="eval.note !== undefined && eval.note < 10">
        {{ eval.note !== undefined ? (eval.note + '/20') : 'Non noté' }}
      </span>
    </div>

    <div class="note-indicator" *ngIf="eval.note !== undefined" [style.width.%]="eval.note * 5">
    </div>

    <p class="commentaire">{{ eval.commentaire }}</p>

    <button (click)="confirmerSuppression(eval.id)" class="delete-btn" title="Supprimer"
            [disabled]="isDeleting === eval.id">
      <i class="fas fa-trash"></i> {{ isDeleting === eval.id ? 'Suppression...' : '' }}
    </button>
      </li>
    </ul>


      <ng-template #noEvaluations>
        <p class="no-eval">Aucune auto-évaluation trouvée.</p>
      </ng-template>
    </ng-template>
  `,
  styles: [`
    /* Styles généraux */
    :host {
      display: block;
      padding: 1rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      color: #1976d2;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    /* Styles du formulaire */
    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: #424242;
    }

    .form-group input, .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      font-family: inherit;
    }

    .form-group textarea {
      min-height: 100px;
      resize: vertical;
    }

    .form-group input:focus, .form-group textarea:focus {
      outline: none;
      border-color: #1976d2;
      box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
    }

    .error-message {
      color: #d32f2f;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    /* Boutons */
    button {
      background-color: #1976d2;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 0.5rem;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    button:hover:not(:disabled) {
      background-color: #1565c0;
      transform: translateY(-1px);
    }

    button:disabled {
      background-color: #b0bec5;
      cursor: not-allowed;
      opacity: 0.7;
    }

    button.active {
      background-color: #0d47a1;
      font-weight: bold;
    }

    /* Contrôles (recherche et tri) */
    .controls {
      display: flex;
      justify-content: space-between;
      margin: 2rem 0 1.5rem;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .search {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      flex-grow: 1;
      min-width: 200px;
      font-size: 1rem;
    }

    .sort-options {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .sort-options span {
      font-size: 0.9rem;
      color: #616161;
    }

    /* Cartes d'évaluation */
    ul {
      padding: 0;
      margin: 0;
    }

    .evaluation-card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      position: relative;
      list-style-type: none;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
    }

    .evaluation-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.12);
      transform: translateY(-2px);
    }

    .evaluation-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 0.95rem;
      align-items: center;
    }

    .date {
      color: #616161;
    }

    .note {
      font-weight: bold;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }

    .note.high {
      color: #2e7d32;
      background-color: #e8f5e9;
    }

    .note.medium {
      color: #f57f17;
      background-color: #fff8e1;
    }

    .note.low {
      color: #c62828;
      background-color: #ffebee;
    }

    .note-indicator {
      height: 8px;
      background: linear-gradient(to right, #ff5e5e, #ffcc00, #4caf50);
      margin: 1rem 0;
      border-radius: 4px;
    }

    .commentaire {
      margin: 1rem 0 0;
      color: #424242;
      line-height: 1.6;
      white-space: pre-wrap;
    }

    .delete-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #ffebee;
      border: none;
      color: #c62828;
      cursor: pointer;
      padding: 0.5rem;
      font-size: 0.9rem;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .delete-btn:hover:not(:disabled) {
      background: #c62828;
      color: white;
    }

    /* Message quand il n'y a pas d'évaluations */
    .no-eval {
      text-align: center;
      color: #757575;
      font-style: italic;
      margin: 3rem 0;
      padding: 2rem;
      background-color: #f5f5f5;
      border-radius: 8px;
      font-size: 1.1rem;
    }

    /* Loading state */
    .loading {
      text-align: center;
      padding: 2rem;
      color: #616161;
      font-size: 1.1rem;
    }

    @media (max-width: 600px) {
      .controls {
        flex-direction: column;
      }
      
      .sort-options {
        width: 100%;
        justify-content: space-between;
      }
    }
  `]
})
export class UserAutoEvaluationComponent implements OnInit {
  evaluations: AutoEvaluation[] = [];
  evaluationsFiltrees: AutoEvaluation[] = [];
  nouvelle: Omit<AutoEvaluation, 'id' | 'date' | 'employeId'> = { 
    commentaire: '', 
    note: undefined 
  };
  employeId: number | null = null;
  searchText: string = '';
  triActif: 'date' | 'note' = 'date';
  isLoading: boolean = false;
  isLoadingEvaluations: boolean = false;
  isDeleting: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private autoEvalService: AutoEvaluationService, 
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUserFromToken();
    this.employeId = user?.id ?? null;
    if (this.employeId) {
      this.chargerEvaluations();
    }
  }

  chargerEvaluations(): void {
    if (!this.employeId) return;
    
    this.isLoadingEvaluations = true;
    this.autoEvalService.getAutoEvaluations(this.employeId).subscribe({
      next: (list) => {
        this.evaluations = list;
        this.filtrerEtTrierEvaluations();
        this.isLoadingEvaluations = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des évaluations', err);
        this.errorMessage = 'Erreur lors du chargement des évaluations';
        this.isLoadingEvaluations = false;
      }
    });
  }

  creerAutoEvaluation(form: NgForm): void {
    if (!this.employeId || !this.nouvelle.commentaire || this.nouvelle.note === undefined) return;

    this.isLoading = true;
    this.errorMessage = null;

    const evaluation: Omit<AutoEvaluation, 'id'> = {
      ...this.nouvelle,
      employeId: this.employeId,
      date: new Date().toISOString()
    };

    this.autoEvalService.creerAutoEvaluation(evaluation).subscribe({
      next: () => {
        this.nouvelle = { commentaire: '', note: undefined };
        form.resetForm();
        this.chargerEvaluations();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        this.errorMessage = 'Erreur lors de la création de l\'auto-évaluation';
        this.isLoading = false;
      }
    });
  }

  confirmerSuppression(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette auto-évaluation ?')) {
      this.supprimerAutoEvaluation(id);
    }
  }

  supprimerAutoEvaluation(id: number): void {
    this.isDeleting = id;
    this.autoEvalService.supprimerAutoEvaluation(id).subscribe({
      next: () => {
        this.chargerEvaluations();
        this.isDeleting = null;
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        this.errorMessage = 'Erreur lors de la suppression';
        this.isDeleting = null;
      }
    });
  }

  filtrerEvaluations(): void {
    this.filtrerEtTrierEvaluations();
  }

  trierPar(critere: 'date' | 'note'): void {
    this.triActif = critere;
    this.filtrerEtTrierEvaluations();
  }

  private filtrerEtTrierEvaluations(): void {
    this.evaluationsFiltrees = this.searchText 
      ? this.evaluations.filter(e => 
          e.commentaire.toLowerCase().includes(this.searchText.toLowerCase()))
      : [...this.evaluations];

    this.evaluationsFiltrees.sort((a, b) => {
      if (this.triActif === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return (b.note ?? 0) - (a.note ?? 0);
      }
    });
  }
}

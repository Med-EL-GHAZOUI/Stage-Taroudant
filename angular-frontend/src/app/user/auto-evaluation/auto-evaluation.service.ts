export interface AutoEvaluation {
  id: number;
  date: string;
  employeId: number;
  commentaire: string;
  note?: number; // <-- correction ici
}

// Simule un service (tu dois déjà avoir les vraies méthodes HTTP ici)
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutoEvaluationService {
  private evaluations: AutoEvaluation[] = [];

  getAutoEvaluations(employeId: number): Observable<AutoEvaluation[]> {
    return of(this.evaluations.filter(e => e.employeId === employeId));
  }

  creerAutoEvaluation(evaluation: Omit<AutoEvaluation, 'id'>): Observable<void> {
    const newEval: AutoEvaluation = {
      id: Date.now(),
      ...evaluation
    };
    this.evaluations.push(newEval);
    return of();
  }

  supprimerAutoEvaluation(id: number): Observable<void> {
    this.evaluations = this.evaluations.filter(e => e.id !== id);
    return of();
  }
}

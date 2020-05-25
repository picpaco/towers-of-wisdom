import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Giocatore } from '../model/giocatore';
import { Observable } from 'rxjs';

@Injectable()
export class GiocatoreService {
    private giocatoriUrl: string;
    constructor(private http: HttpClient) {
        this.giocatoriUrl = 'http://localhost:8080/giocatori';
    }

    public findAll(): Observable<Giocatore[]> {
        return this.http.get<Giocatore[]>(this.giocatoriUrl);
    }

    public save(giocatore: Giocatore) {
        return this.http.post<Giocatore>(this.giocatoriUrl, giocatore);
    }
}

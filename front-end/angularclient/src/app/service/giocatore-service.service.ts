import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Giocatore } from '../model/giocatore';
import { Observable } from 'rxjs';
import { Carta } from '../model/Carta';

@Injectable()
export class GiocatoreService {
    private giocatoriUrl: string;
    constructor(private http: HttpClient) {
        this.giocatoriUrl = 'http://localhost:8080/giocatori';
    }

    public findAll(): Observable<Giocatore[]> {
        return this.http.get<Giocatore[]>(this.giocatoriUrl);
    }

    public getCarte(): Observable<Carta[]> {
        let username = "stefano89";
        let password = "stefanorusso";
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.http.get<Carta[]>('http://localhost:8080/menu-di-gioco',{headers});
    }

    public save(giocatore: Giocatore) {
        return this.http.post<Giocatore>(this.giocatoriUrl, giocatore);
    }
}

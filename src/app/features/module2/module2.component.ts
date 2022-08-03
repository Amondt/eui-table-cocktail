import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './module2.component.html'
})
export class Module2Component implements OnInit {
    constructor(private http: HttpClient) { }

    public dataSource: any[] = [];

    public dataSourceData: any[] = [
        { id: 1, country: 'Austria', year: 1995, iso: 'AT', population: 8504850, capital: 'Vienna' },
        { id: 2, country: 'Belgium', year: 1958, iso: 'BE', population: 11198638, capital: 'Brussels' },
        { id: 3, country: 'Bulgaria', year: 2007, iso: 'BG', population: 7364570, capital: 'Sofia' },
        { id: 4, country: 'Croatia', year: 2013, iso: 'HR', population: 4284889, capital: 'Zagreb' },
        { id: 5, country: 'Cyprus', year: 2004, iso: 'CY', population: 1117000, capital: 'Nicosia' },
        { id: 6, country: 'Czechia', year: 2004, iso: 'CZ', population: 10513209, capital: 'Prague' },
        { id: 7, country: 'Denmark', year: 1973, iso: 'DK', population: 5655750, capital: 'Copenhagen' },
        { id: 8, country: 'Estonia', year: 2004, iso: 'EE', population: 1315819, capital: 'Tallinn' },
        { id: 9, country: 'Finland', year: 1995, iso: 'FI', population: 5470820, capital: 'Helsinki' },
        { id: 10, country: 'France', year: 1958, iso: 'FR', population: 67210000, capital: 'Paris' },
    ];
    public dataSourceEmpty: any[] = [];

    ngOnInit() {
        this.http.get("https://randomuser.me/api/?results=20").subscribe((res: any) => {
            console.log(res.results);

            this.dataSource = res.results;
        })
        // http://www.thecocktaildb.com/api/json/v1/1/random.php

    }
}

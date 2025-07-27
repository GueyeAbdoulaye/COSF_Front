import { Component, OnDestroy, OnInit } from "@angular/core";
import { JoueurCardComponent } from "../joueur-card/joueur-card.component";
import { CosfService } from "../cosf.service";
import { Subscription } from "rxjs";

export interface PlayerDto {
  nom: string;
  prenom: string;
  poste: string;
  numero: number;
}

@Component({
  selector: "app-effectif",
  imports: [JoueurCardComponent],
  templateUrl: "./effectif.component.html",
  styleUrl: "./effectif.component.scss",
})
export class EffectifComponent implements OnInit, OnDestroy {
  listPlayers: PlayerDto[] = [];

  subscriptions: Subscription[] = [];

  constructor(private cosfService: CosfService) {}

  ngOnInit(): void {
    this.getAllPlayers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getAllPlayers(): void {
    this.listPlayers = []; // Reset the list before fetching new data

    let sub = this.cosfService.getAllPlayers().subscribe(
      (response: PlayerDto[]) => {
        this.listPlayers = response;
      },
      (error) => {
        console.error("Error fetching players:", error);
      }
    );

    this.subscriptions.push(sub);
  }
}

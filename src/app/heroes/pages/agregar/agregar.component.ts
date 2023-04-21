import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      .form {
        margin-top: 10vh;
      }
      img {
        max-width: 100%;
        max-height: calc(100vh - 300px);
      }

      @media (max-width: 576px) {
        img {
          width: 100%;
          max-height: 100%;
        }
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  ngOnInit(): void {

    if (!this.router.url.includes('editar')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroe(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  saved: boolean = false;
  isValidForm: boolean = true;
  error: string = '';

  guardar() {
    if (
      this.heroe.superhero.trim().length === 0 ||
      this.heroe.first_appearance.trim().length === 0 ||
      this.heroe.alter_ego.trim().length === 0 ||
      this.heroe.characters.trim().length === 0 ||
      this.heroe.alter_ego.trim().length === 0 ||
      this.heroe.alt_img?.trim().length === 0
    ) {
      this.isValidForm = false;
      setTimeout(() => {
        this.isValidForm = true;
      }, 2000);
      return;
    }

    if (!this.heroe._id) {
      this.heroesService
        .agregarHeroe(this.heroe)
        .subscribe((heroe) => (this.heroe = heroe));
      this.mostrarSnakBar('Guardado');
      this.saved = true;
      setTimeout(() => {
        this.saved = false;
        this.router.navigate([`/heroes/${this.heroe._id}`]);
      }, 3000);
    } else {
      this.heroesService.editarHeroe(this.heroe, this.heroe._id)
        .subscribe({
          next:  (heroe) =>{
            this.heroe = heroe
            this.mostrarSnakBar('Actualizado');
            this.saved = true;
            setTimeout(() => {
              this.saved = false;
              this.router.navigate([`/heroes/${this.heroe._id}`]);
            }, 3000);

          },
          error: error => {
            this.error = error.error.msg;
            setTimeout(() => {
              this.router.navigate(['/heroes']);
              this.saved = false;
            }, 2000);
            return
          }
       });
    }
  }

  delete() {
    this.saved = true;
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '400px',
      data: { ...this.heroe },
    });

    dialog.afterClosed().subscribe((result) => {
      result === true
        ? this.heroesService.eliminarHeroe(this.heroe._id!).subscribe({
            next: (resp) => {
              this.mostrarSnakBar('Eliminado');
              setTimeout(() => {
                this.router.navigate(['/heroes']);
                this.saved = false;
              }, 1000);
            },
            error: (error) => {
              this.error = error.error.msg;
              setTimeout(() => {
                this.router.navigate(['/heroes']);
                this.saved = false;
              }, 2000);
            },
          })
        : setTimeout(() => {
            this.router.navigate(['/heroes']);
          }, 1500);
    });
  }
  regresar() {
    this.router.navigate(['/heroes']);
  }

  mostrarSnakBar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500,
    });
  }
}

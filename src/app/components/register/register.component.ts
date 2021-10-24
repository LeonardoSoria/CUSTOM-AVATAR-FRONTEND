import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {CryptService} from '../../services/crypt.service';
import {User} from '../../interfaces/user.interface';
import {AlertService} from '../../ng-alerts/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name = '';
  lastname = '';
  userLogin = '';
  password = '';


  constructor(private logger: LogService,
              private service: ApiService,
              private router: Router,
              private alert: AlertService,
              private cryptService: CryptService) {
  }

  ngOnInit(): void {
  }

  register(): void {
    const user: User = {
      id: 0,
      name: this.name,
      lastname: this.lastname,
      username: this.userLogin,
      password: this.cryptService.encrypt(this.password)
    };

    this.service.registerUser(user).subscribe(data => {
      if (data !== null) {
        this.logger.info('El usuario ' + localStorage.getItem('user') + ' se registró en la aplicación');
        this.alert.success('Usuario registrado exitosamente', 'Registro completado');
        this.router.navigate(['/login']);
        this.clearFields();
      } else {
        this.logger.error('El usuario ' + localStorage.getItem('user') + ' no pudo registrarse en la aplicación');
        this.alert.error('El usuario no pudo ser registrado en la aplicación', 'Registro fallido');
        this.clearFields();
      }
    });
  }

  clearFields(): void {
    this.name = '';
    this.lastname = '';
    this.userLogin = '';
    this.password = '';
  }

}

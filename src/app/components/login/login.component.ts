import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {ApiService} from '../../services/api.service';
import {CryptService} from '../../services/crypt.service';
import {Router} from '@angular/router';
import {AlertService} from '../../ng-alerts/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin = '';
  password = '';
  message = false;

  constructor(private logger: LogService,
              private service: ApiService,
              private alert: AlertService,
              private cryptService: CryptService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    const loginUser: any = {
      username: this.userLogin,
      password: this.cryptService.encrypt(this.password)
    };
    this.service.login(loginUser).subscribe(data => {
      if (data !== null) {
        localStorage.setItem('user', JSON.stringify(data));
        this.logger.info('El usuario ' + JSON.parse(localStorage.getItem('user')).username + ' inició sesión en la aplicación');
        this.alert.success('Se ha iniciado la sesión', '');
        this.router.navigate(['/main-page']);
        this.clearFields();
      } else {
        this.logger.error('El usuario no pudo registrarse en la aplicación');
        this.alert.error('Usuario o contraseña incorrectos', 'Inicio de sesión fallido');
        this.clearFields();
      }
    });
  }

  clearFields(): void {
    this.userLogin = '';
    this.password = '';
  }

}

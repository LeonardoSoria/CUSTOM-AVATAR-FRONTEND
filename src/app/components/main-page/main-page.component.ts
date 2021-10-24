import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {LogService} from '../../services/log.service';
import {Part} from '../../interfaces/part.interface';
import {User} from '../../interfaces/user.interface';
import {Avatar} from '../../interfaces/avatar.interface';
import {AlertService} from '../../ng-alerts/alert.service';
import {AvatarGet} from '../../interfaces/avatarGet.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  building = 1;

  faceList: Part[] = [];
  eyeList: Part[] = [];
  mouthList: Part[] = [];
  noseList: Part[] = [];
  mustacheList: Part[] = [];
  hatList: Part[] = [];
  userList: User[] = [];
  avatarGetList: AvatarGet[] = [];

  user = '';

  currentFace: Part;
  currentEye: Part;
  currentMouth: Part;
  currentNose: Part;
  currentMustache: Part;
  currentHat: Part;
  name = '';

  constructor(private service: ApiService, private router: Router, private logger: LogService, private alert: AlertService) {
  }

  ngOnInit(): void {
    this.getAllParts();
    this.getAllUsers();
  }

  selectedFace(img: Part): void {
    this.currentFace = img;
  }

  selectedEye(img: Part): void {
    this.currentEye = img;
  }

  selectedNose(img: Part): void {
    this.currentNose = img;
  }

  selectedMustache(img: Part): void {
    this.currentMustache = img;
  }

  selectedMouth(img: Part): void {
    this.currentMouth = img;
  }

  selectedHat(img: Part): void {
    this.currentHat = img;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getAllUsers(): void {
    this.service.getAllUsers().subscribe(data => {
      this.userList.push(...data);
    });
  }

  getAvatarsByUserId(userParam: User): void {
    this.service.getAvatarsByUserId(userParam.id).subscribe(data => {
      this.avatarGetList.push(...data);
    });
    this.user = userParam.username;
  }

  getAllParts(): void {
    this.service.getFaces().subscribe(data => {
      this.faceList.push(...data);
      this.currentFace = this.faceList[0];
    });
    this.service.getEyes().subscribe(data => {
      this.eyeList.push(...data);
      this.currentEye = this.eyeList[0];
    });
    this.service.getHats().subscribe(data => {
      this.hatList.push(...data);
      this.currentHat = this.hatList[0];
    });
    this.service.getMouths().subscribe(data => {
      this.mouthList.push(...data);
      this.currentMouth = this.mouthList[0];
    });
    this.service.getMustache().subscribe(data => {
      this.mustacheList.push(...data);
      this.currentMustache = this.mustacheList[0];
    });
    this.service.getNose().subscribe(data => {
      this.noseList.push(...data);
      this.currentNose = this.noseList[0];
    });
  }

  selectAvatar(avatar: AvatarGet): void {
    this.currentFace = avatar.faceType;
    this.currentHat = avatar.hatType;
    this.currentEye = avatar.eyeType;
    this.currentMouth = avatar.mouthType;
    this.currentNose = avatar.noseType;
    this.currentMustache = avatar.mustacheType;
  }

  saveAvatar(): void {
    const avatar: Avatar = {
      id: 0,
      name: this.name,
      faceId: this.currentFace.id,
      hatId: this.currentHat.id,
      eyeId: this.currentEye.id,
      mouthId: this.currentMouth.id,
      noseId: this.currentNose.id,
      mustacheId: this.currentMustache.id,
      userId: JSON.parse(localStorage.getItem('user')).id
    };

    if (this.name !== '') {
      this.service.saveAvatar(avatar).subscribe(data => {
        console.log(data);
        if (data !== null) {
          this.logger.info('Se creo el avatar para el usuario ' + JSON.parse(localStorage.getItem('user')).username);
          this.alert.success('Avatar creado exitosamente', 'Creación completada');
          this.name = '';
        } else {
          this.logger.info('No se pudo crear el avatar para el usuario ' + JSON.parse(localStorage.getItem('user')).username);
          this.alert.error('Hubo un error al crear el avatar', 'Error de creación');
          this.name = '';
        }
      });
    } else {
      this.alert.info('Debe rellenar el campo nombre del avatar', '');
    }
  }

  resetAvatar(): void {
    this.currentFace = this.faceList[0];
    this.currentEye = this.eyeList[0];
    this.currentHat = this.hatList[0];
    this.currentMouth = this.mouthList[0];
    this.currentMustache = this.mustacheList[0];
    this.currentNose = this.noseList[0];
  }

  clearUserAvatarsList(): void {
    this.avatarGetList = [];
  }

}

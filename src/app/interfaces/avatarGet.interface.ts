import {Part} from './part.interface';

export interface AvatarGet {
  id: number;
  name: string;
  faceType: Part;
  hatType: Part;
  eyeType: Part;
  mouthType: Part;
  noseType: Part;
  mustacheType: Part;
  userId: number;
}

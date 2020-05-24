import type from './user-clicked-alert.type';
import createStandardAction from '../../utilities/create-standard-action';

const userDismissedAlert = createStandardAction(type);

export default userDismissedAlert;

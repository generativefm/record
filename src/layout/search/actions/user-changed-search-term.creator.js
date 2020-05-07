import createStandardAction from '../../../utilities/create-standard-action';
import type from './user-change-search-term.type';

const userChangedSearchTerm = createStandardAction(type);

export default userChangedSearchTerm;

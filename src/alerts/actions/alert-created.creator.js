import { v4 } from 'uuid';
import type from './alert-created.type';

const alertCreated = ({
  description,
  callToAction,
  url,
  onClick,
  isExternal = false,
  isLoud = false,
}) => ({
  type,
  payload: {
    description,
    callToAction,
    url,
    onClick,
    isExternal,
    isLoud,
    timestamp: Date.now(),
    id: v4(),
  },
});

export default alertCreated;

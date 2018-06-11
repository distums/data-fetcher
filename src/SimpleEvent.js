import isFunction from './utils/isFunction';
import when from 'ramda/es/when';
import partial from 'ramda/es/partial';
import push from './utils/push';
import invoke from './utils/invoke';

export default function SimpleEvent() {
  const listeners = [];

  return {
    subscribe: partial(when, isFunction, partial(push, listeners)),
    emit: partial(invoke, listeners),
  };
}

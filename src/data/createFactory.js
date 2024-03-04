import { createElement } from 'react';

export default function createFactory(type) {
    return createElement.bind(null, type);
}
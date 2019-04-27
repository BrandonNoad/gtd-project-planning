import _has from 'lodash/has';

export const netlifyIdentityResultToSession = (netlifyIdentityResult) =>
    _has(netlifyIdentityResult, 'user_metadata') ? netlifyIdentityResult : null;

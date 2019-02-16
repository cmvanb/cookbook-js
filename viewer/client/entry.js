import React from 'react';
import ReactDOM from 'react-dom';

import { Recipe } from 'core/containers';

(() => {
    let $content = document.getElementById('content');

    if (!$content) {
        $content = document.createElement('div');
        $content.setAttribute('id', 'content');
        document.body && document.body.appendChild($content);
    }

    if ($content) {
        ReactDOM.render(
            <Recipe />,
            $content,
        );
    }
})();

import React from 'react';
import {render} from 'react-dom';

import Hello from './source/hello';


render(<Hello name='Alex'/>, document.getElementById('container'));
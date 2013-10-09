# mongoose-access-gen

A little mongoose-plugin for generating array property adders and deleters

## Getting Started
Install the module with: `npm install mongoose-access-gen`

```javascript
[...]

var access = require('mongoose-access-gen');

var ComedianSchema = new Schema({
  jokes   : [{ type: String  }],
  laughing:  { type: Boolean }
});

ComedianSchema.plugin(access);

var Comedian = mongoose.model('Comedian', ComedianSchema),
    comedian = new Comedian({
      jokes: ['A haskell programmer walks into a bar (...)']
    });

// Works with arrays
comedian._genAdd('jokes') ('I\'m a C programmer (...)');
comedian._genDel('jokes') ('A haskell programmer walks into a bar (...)');

[...]
```

## License
Copyright (c) 2013 Yamada. Licensed under the MIT license.

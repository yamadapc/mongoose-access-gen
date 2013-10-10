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

// And values
comedian._genSet('laughing') (true);

// And it automatically generates useless methods
var funniest_joke = 'Objective C++ (that\'s all)';

comedian.addJoke(funniest_joke);
comedian.jokes.indexOf(funniest_joke) !== -1 // true

comedian.delJoke(funniest_joke);
comedian.jokes.indexOf(funniest_joke)        // -1

comedian.setLaughing(true);
comedian.laughing                            // true

comedian.unsetLaughing();
comedian.laughing                            // undefined

[...]
```

## License
Copyright (c) 2013 Yamada. Licensed under the MIT license.

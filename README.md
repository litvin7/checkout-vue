# checkout-vue

>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

### config
``` js
{
  options: {},
  regular: {},
  params: {},
  popup: {},
  messages: {},
  validate: {}
}
```

### options
Name                  | Type        | Default                 | Description                                                                         | Priority
---                   | ---         | ---                     | ---                                                                                 | ---
`methods`             | Array       | ['card']                | support `card`, `emoney`, `ibank`, `cash`, `sepa`.                                  |
`ibank`               | Array       |                         | support `p24`, `platba24`, `raiffeisen`.                                            |
`emoney`              | Array       |                         | support `paypal`, `qiwi`, `webmoney`, `yamoney`.                                    |
`cash`                | Array       |                         | support `liqpay`.                                                                   |
`fast`                | Array       |                         | support .                                                                           |
`card_icons`          | Array       | ['mastercard', 'visa']  | support `mastercard`, `visa`, `mir`, `prostir`, `diners-club`, `american-express`.  |
`title`               | String      |                         |                                                                                     | options or server
`link`                | String      |                         | format url                                                                          | server or options
`full_screen`         | Boolean     | true                    |                                                                                     |
`locales`             | Array       |                         | support `ru`, `en`, `uk`, `lv`, `fr`, `cs`, `sk`.                                   |
`api_domain`          | String      | 'api.fondy.eu'          |                                                                                     |
`css`                 | String      |                         | support `bootstrap3`, `bootstrap4`, `foundation6`.                                  |
`active_tab`          | String      |                         | support `card`, `emoney`, `ibank`, `cash`, `sepa`.                                  | server or options
`logo_url`            | String      |                         | format url                                                                          | options or server
`offerta_url`         | String      |                         | format url                                                                          | options or server
`button`              | Boolean     | true                    |                                                                                     |
`cancel`              | Boolean     | true                    |                                                                                     |
`fee`                 | Boolean     | true                    |                                                                                     |
`tooltip`             | Boolean     | true                    |                                                                                     |
`email`               | Boolean     | false                   |                                                                                     | server or options
`fields`              | Boolean     | false                   |                                                                                     |
`default_country`     | String      |                         |                                                                                     |
`countries`           | Array       |                         |                                                                                     |

### popup
Name                  | Type        | Default                 | Description
---                   | ---         | ---                     | ---
`append_to`           | String      | 'body'                  |

### regular
Name                  | Type        | Default                 | Description
---                   | ---         | ---                     | ---
`insert`              | Boolean     | false                   |
`open`                | Boolean     | false                   |
`hide`                | Boolean     | false                   |
`period`              | Array       | ['day', 'week', 'month']| support `day`, `week`, `month`.

### params
Name                  | Type        | Default                 | Description                 | Priority
---                   | ---         | ---                     | ---                         | ---
`merchant_id`         | Integer     | 1396424                 |                             |
`order_desc`          | String      |                         |                             | options or server
`amount`              | Integer     | 100                     |                             |
`currency`            | String      | 'USD'                   |                             |
`response_url`        | String      |                         | format url                  |
`lang`                | String      | 'en'                    |                             | server or options
`required_rectoken`   | String      |                         | support `Y`, `N`, `y`, `n`. |
`verification`        | String      |                         | support `Y`, `N`, `y`, `n`. |
`verification_type`   | String      |                         | support `amount`, `code`    |
`token`               | String      |                         | length 40                   |
`offer`               | Boolean     | false                   |                             |
`recurring_data`      | Object      |                         |                             |
`custom`              | Object      |                         |                             |
`customer_data`       | Object      |                         |                             |

#### recurring_data
Name                  | Type        | Default                 | Description
---                   | ---         | ---                     | ---
`every`               | Integer     | 1                       |
`period`              | String      | 'month'                 | support `day`, `week`, `month`.
`amount`              | Integer     | 100                     |
`end_time`            | String      |                         | format YYYY-MM-DD
`start_time`          | String      |                         | format YYYY-MM-DD

#### customer_data
Name                  | Type        | Default                 | Description
---                   | ---         | ---                     | ---
`customer_name`       | String      |                         |
`customer_address`    | String      |                         |
`customer_zip`        | String      |                         |
`customer_city`       | String      |                         |
`customer_country`    | String      |                         | dictionary countries
`customer_state`      | String      |                         |
`phonemobile`         | String      |                         | format phone
`email`               | String      |                         | format email

### messages
``` js
{
  messages: {
    {en}: {
      {id}: {value},
      ...
    },
    ...
  },
}
```

### validate
``` js
{
  validate: {
    {en}: {
      {id}: {value},
      ...
    },
    ...
  },
}
```

## Use
``` js
var app = fondy({css selector}, {config})

app.$on('success', function(model) {})
app.$on('error', function(model) {})
app.$on('ready', function(model) {})
app.$on('callback', function(model) {})

app.submit()
app.$emit('submit')

app.location({method}, {system})
app.$emit('location', {method}, {system}) method support `card`, `emoney`, `ibank`, `cash`, `sepa`

app.setParams({params})
app.$emit('setParams', {params})

app.destroy()
```
full_screen: true - add css

## Use validate

support `after`, `alpha`, `date_format`, `decimal`, `digits`, `email`, `max`, `min`, `numeric`, `required`, `customer_field`, `phone`, `numrange`, `ccard`

``` html
<input-text name="email" validate="required|email"></input-text>
```


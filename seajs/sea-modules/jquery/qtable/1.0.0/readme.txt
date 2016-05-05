handlebars template for data grid
http://stackoverflow.com/questions/15999982/handlebars-template-for-data-grid


Tables are rendered row first then column so your gridrow structure should be really accurately described using col instead of row (if your data isn't in this order, you need to do some preprocessing work to transform your dataset prior to rendering it to the template):
gridrow: [
    { col1: 'a', col2: 'b', col3: 'c' }, 
    { col1: 'd', col2: 'e', col3: 'f' }, 
    { col1: 'g', col2: 'h', col3: 'i' }
]
The portion of the template to output the gridRow data would be something like this: 
<tbody>
{{#each gridrow}}
    <tr>
        <td>{{col1}}</td>
        <td>{{col2}}</td>
        <td>{{col3}}</td>
    </tr>
{{/each}}
</tbody>
See fiddle for fully working code: http://jsfiddle.net/amyamy86/LG5Fp/

Edit: If you want to generate dynamic grids:

Data might be (array of arrays):
gridrow: [
    ['a', 'b', 'c'], 
    ['d', 'e', 'f'],
    ['g', 'h', 'i']
]
Then the template will be: 
<tbody>
{{#each gridrow}}
    <tr>
        {{#each this}}
            <td>{{this}}</td>
        {{/each}}
    </tr>
{{/each}}
</tbody>
The this is a special keyword that referes to the current item in the array that it's iterating through.


var searchClient = algoliasearch(
    'RYJN1YRC0M',
    'ad1ae0e0dff0248f840b2e9dc1dd0f86'
);

var search = instantsearch({
    indexName: 'nathanfriend.io',
    searchClient: searchClient,
    routing: true
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#search-box',
        placeholder: 'Search this site...',
        autofocus: true,
        showReset: false,
        showSubmit: false
    })
);

var hitTemplate = [
    '<a href="{{ url }}">',
    '    <h2>',
    '        {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}',
    '    </h2>',
    '</a>',
    '<span class="post-date"> {{ date }} </span>',
    '<p>',
    '    {{#helpers.highlight}}{ "attribute": "content" }{{/helpers.highlight}}',
    '</p>'
].join('\n');

var transformItems = function transformItems(items) {
    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.date) {
            var itemDate = new Date(item.date * 1000);
            var year = itemDate.getFullYear();
            var month = months[itemDate.getMonth()];
            var day = itemDate.getDate();

            item.date = month + ' ' + day + ', ' + year;
        }
    }

    return items;
};

search.addWidget(
    instantsearch.widgets.hits({
        container: '#hits',
        templates: { item: hitTemplate },
        transformItems: transformItems
    })
);

search.start();

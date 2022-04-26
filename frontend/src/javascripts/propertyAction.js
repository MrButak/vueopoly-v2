let dtrmPropActionH = (property) => {

    switch(property.group) {

        case 'land':
        case 'railroad':
        case 'utilities': {
            // can buy, pay money

        }

        case 'special':
            // goto jail, chance / community, tax, free parking (go already handled, jailjustvisiting no need to handle)

    }
};

export { dtrmPropActionH }
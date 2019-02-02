# Instructions

To get the API up and running run:

```console
    yarn reload
```

All API requests are made to: ***http://localhost:8000***


#MVP

## Register

a **POST** request to */register* will create a new user and return an object including an authentication token:

{
    email: 'jdoe@abc.com',
    token: 'aKafj1Dg2kLD434So',
    message: 'Registration Successful'
}

the **POST** request must include the following:

- *name*
- *email*
- *password*


## Login

a **POST** request to */login* will login the user and return an object with an authentication token:

{
    email: 'jdoe@abc.com',
    token: 'aKafj1Dg2kLD434So',
    message: 'Login Successful'
}

the **POST** request must include the following:

- *email*
- *password*


## Inventory

a **GET** request to */inventory* will return an object with all items in the inventory:

{
    {id: 1, name: 'strawberries', amount: 1, unit: 'lb(s)', categoryID: 1},
    {id: 2, name: 'blueberries', amount: 20, unit: 'oz', categoryID: 1},
    {id: 3, name: 'carrots', amount: 1.5, unit: 'lbs', categoryID: 2},
    {id: 4, name: 'broccoli', amount: 1, unit: 'lb', categoryID: 2}
}

----------------------------------------------------
a **POST** request to */inventory* will return the itemID of the added item:

{
    itemID: 5
}

the **POST** request must include the following:

- *name*
- *amount* (**as an integer**)
- *unit* 


----------------------------------------------------
a **GET** request to */inventory/:id* will return an object including the item with the associated ID:

{
    id: 1, name: 'strawberries',
    amount: 1, unit: 'lb(s)',
    categoryID: 1
}

----------------------------------------------------
a **DELETE** request to */inventory/:id* will return an object with a deletedCount of 1 if successful:

{
    deletedCount: 1
}

----------------------------------------------------
a **PUT** request to */inventory/:id* will return an object with a updatedCount of 1 if successful:

{
    updatedCount: 1
}

the **PUT** request must include the following:

- *name*
- *amount* (**as an integer**)
- *unit*



#Stretch

##Categories

a **GET** request to */categories* will return a list of all the categories:

}
    {
        id: 1,
        name: 'fruits',
        inventory: [
        {id: 1, name: 'strawberries', amount: '1 lb', categoryID: 1},
        {id: 2, name: 'blueberries', amount: '20 oz', categoryID: 1}
        ]
    }
    {
        id: 2,
        name: 'vegetables',
        items: [
        {id: 3, name: 'carrots', amount: 1.5, unit: 'lb(s)', categoryID: 2},
        {id: 4, name: 'broccoli', amount: 1, unit: 'lb(s)', categoryID: 2}
        ]
    }
}

----------------------------------------------------
a **POST** request to */categories* will return the categoryID of the new category:

{
    categoryID: 5
}

the **POST** request must include the following:
- *name*

------------------------------------------------------
a **GET** request to */categories/:id* will return an object with the category associated the ID:

{
    id: 1,
    name: 'fruits',
    items: [
    {id: 1, name: 'strawberries', amount: 1, unit: 'lb(s)', categoryID: 1},
    {id: 2, name: 'blueberries', amount: 20, unit: 'oz', categoryID: 1}
    ]
}

------------------------------------------------------
a **PUT** request to */categories/:id* will return an object with a updatedCount of 1 if successful:

{
    updatedCount: 1
}

the **PUT** request must include the following:
- *name*

------------------------------------------------------
a **DELETE** request to */categories/:id* will return an object with a deletedCount of 1 if successful:

{
    deletedCount: 1
}

***Note***: This will delete the category and **ALL** items associated with the category!


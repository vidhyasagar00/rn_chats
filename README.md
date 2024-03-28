falsy values -> false, null, undefined, '', "", ``, 0.
truthy values -> all other then falsy values are truthy values.

<FlatList
   style={{flexGrow: 1}}
   data={chats}
   inverted
   horizontal
   renderItem={({index, item}) =>
     ChatItem({
       index: index,
       item: item,
        isMe: item.sender_id == user?.userId,
     })
  }
/>

[NAVIGATION]
navigate('route') -> navigate to screen
push('route') -> create copy of same screen(allows to use multiple same screen)
goBack -> go back to previous screen
popToTop -> go back to the first screen in the stack. ie. open new screen before popToTop

pass params -> 
  eg. navigate('route', {<params>})

initial params -> 
  eg: 
  <Stack.Screen
  name="Details"
  component={DetailsScreen}
  initialParams={{ itemId: 42 }}
/>

updating params ->
navigation.setParams({
  itemId: 25,
});

pass to previous screen ->
 we can use the navigate method, which acts like goBack if the screen already exists.
 




[LODASH]
const {debounce} = require('lodash');
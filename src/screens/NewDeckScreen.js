import React, { useState } from 'react'
import { SafeAreaView, TextInput, Button } from 'react-native'
import CustomStatusBar from '../components/CustomStatusBar'
import { useNavigation } from '@react-navigation/native'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'

const NewDeckScreen = () => {
  const navigation = useNavigation()
  const deckStore = useDeckStore()
  const [input, setInput] = useState('')

  const onPress = () => {
    const newDeck = deckStore.addDeck(input)
    navigation.navigate('DeckDetail', { deckId: newDeck.id })
  }

  return (
    <>
      <CustomStatusBar />
      <SafeAreaView style={sharedStyles.containerPadding}>
        <TextInput
          style={sharedStyles.textInput}
          placeholder="New Deck Name"
          onChangeText={(text) => setInput(text)}
          defaultValue={input}
        />
        <Button
          title="Create New Deck"
          disabled={input.trim() === ''}
          onPress={onPress}
        />
      </SafeAreaView>
    </>
  )
}

export default NewDeckScreen

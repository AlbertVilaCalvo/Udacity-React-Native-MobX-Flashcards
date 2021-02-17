import React from 'react'
import { Text, Button, TouchableOpacity, StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'
import DeckList from '../components/DeckList'
import { TextBody } from '../components/styled/text'

const HomeScreen = observer(({ navigation }) => {
  const deckStore = useDeckStore()
  const decks = deckStore.decks

  if (decks.length === 0) {
    return (
      <View style={sharedStyles.containerCentered}>
        <TextBody style={styles.noDecksText}>
          You don't have any decks yet.
        </TextBody>
        <Button
          title="Create one!"
          onPress={() => navigation.navigate('NewDeck')}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Text>Welcome</Text>
      </TouchableOpacity>
      <DeckList decks={decks} />
    </View>
  )
})

export default HomeScreen

const styles = StyleSheet.create({
  noDecksText: {
    marginBottom: 16,
  },
  container: {
    flex: 1,
  },
})

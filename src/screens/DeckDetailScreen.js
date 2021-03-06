import React, { useLayoutEffect } from 'react'
import { Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'
import DeckNotFound from '../components/DeckNotFound'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { TextHeading, TextTitle } from '../components/styled/text'
import CustomButton from '../components/styled/CustomButton'
import HeaderButton from '../components/styled/HeaderButton'

const DeckDetailScreen = observer(({ route, navigation }) => {
  const deckStore = useDeckStore()
  const deckId = route.params.deckId
  const deck = deckStore.getDeck(deckId)

  useLayoutEffect(() => {
    if (deck === null) {
      return
    }
    navigation.setOptions({
      title: deck.name,
      headerRight: () => (
        <HeaderButton
          text="Delete Deck"
          onPress={() => {
            deckStore.removeDeck(deckId)
            // If we've just created the deck, on back press we want to go
            // to the Home without seeing the NewDeckScreen in between
            navigation.navigate('Home')
          }}
        />
      ),
    })
  }, [deck, deckId, deckStore, navigation])

  if (deck === null) {
    return <DeckNotFound deckId={deckId} />
  }

  return (
    <CustomSafeAreaView
      style={sharedStyles.containerCenterVerticalPaddingHorizontal}>
      <TextTitle style={styles.bottomMargin}>{deck.name}</TextTitle>
      <TextHeading style={styles.bottomMargin}>
        {deck.cardCountFormatted}
      </TextHeading>
      <Text style={styles.bottomMargin}>ID: {deckId}</Text>
      <CustomButton
        text="Add Card"
        onPress={() => navigation.navigate('NewCard', { deckId })}
        style={styles.bottomMargin}
      />
      <CustomButton
        text="Start Quiz"
        onPress={() => navigation.navigate('Quiz', { deckId })}
        disabled={deck.cardCount === 0}
      />
    </CustomSafeAreaView>
  )
})

export default DeckDetailScreen

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: 20,
  },
})

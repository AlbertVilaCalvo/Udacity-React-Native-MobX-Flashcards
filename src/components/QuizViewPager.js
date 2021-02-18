import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import { useNavigation } from '@react-navigation/native'
import CustomButton from './styled/CustomButton'

const ANSWER_CORRECT = 'correct'
const ANSWER_INCORRECT = 'incorrect'

const initialCardStates = (cardCount) =>
  Array(cardCount).fill({ showAnswer: false, answer: null })

const QuizViewPager = ({ deck }) => {
  const cardCount = deck.cards.length

  const [cardStates, setCardStates] = useState(initialCardStates(cardCount))

  const viewPager = useRef()
  const onReset = () => {
    viewPager.current.setPage(0)
    setCardStates(initialCardStates(cardCount))
  }

  const onShowAnswer = (index) => {
    setCardStates((states) => {
      return states.map((state, i) =>
        i === index ? { ...states[index], showAnswer: true } : state,
      )
    })
  }

  const onSetAnswer = (index, answer) => {
    setCardStates((states) => {
      return states.map((state, i) =>
        i === index ? { ...states[index], answer } : state,
      )
    })
  }

  return (
    <ViewPager
      ref={viewPager}
      initialPage={0}
      style={styles.viewPager}
      showPageIndicator={true}>
      {deck.cards.map((card, index) => (
        <View style={styles.pageContainer} collapsable={false} key={index}>
          <Text>
            Question {index + 1}/{cardCount}
          </Text>
          <Text>{card.question}</Text>
          {cardStates[index].showAnswer ? (
            <Text>{card.answer}</Text>
          ) : (
            <CustomButton
              text="Show Answer"
              onPress={() => onShowAnswer(index)}
              style={styles.marginVertical}
            />
          )}
          {cardStates[index].answer === null ? (
            <>
              <CustomButton
                text="Correct"
                style={styles.marginVertical}
                onPress={() => onSetAnswer(index, ANSWER_CORRECT)}
              />
              <CustomButton
                text="Incorrect"
                onPress={() => onSetAnswer(index, ANSWER_INCORRECT)}
                style={styles.marginVertical}
              />
            </>
          ) : (
            <Text>Your answer: {cardStates[index].answer}</Text>
          )}
        </View>
      ))}

      <View
        style={styles.pageContainer}
        collapsable={false}
        key={deck.cards.length}>
        <SummaryPage onReset={onReset} cardStates={cardStates} />
      </View>
    </ViewPager>
  )
}

const SummaryPage = ({ cardStates, onReset }) => {
  const navigation = useNavigation()

  const backPress = () => {
    navigation.goBack()
  }

  const isDone = cardStates.every((state) => state.answer !== null)

  const totalAnswers = cardStates.length
  const correctAnswers = cardStates.reduce(
    (acc, state) => (state.answer === ANSWER_CORRECT ? acc + 1 : acc),
    0,
  )
  const incorrectAnswers = totalAnswers - correctAnswers

  return (
    <>
      <Text>Summary</Text>
      {isDone ? (
        <>
          <Text>Your score</Text>
          <Text>
            Correct: {correctAnswers}/{totalAnswers}
          </Text>
          <Text>
            Incorrect: {incorrectAnswers}/{totalAnswers}
          </Text>
        </>
      ) : (
        <Text>You have not answered all questions yet.</Text>
      )}
      <CustomButton
        text="Restart Quiz"
        onPress={onReset}
        style={styles.marginVertical}
      />
      <CustomButton
        text="Back to Deck"
        onPress={backPress}
        style={styles.marginVertical}
      />
    </>
  )
}

export default QuizViewPager

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginVertical: {
    marginVertical: 5,
  },
})

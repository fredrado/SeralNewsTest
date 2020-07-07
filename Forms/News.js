
import React, { Component } from 'react'

import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Platform } from 'react-native'



const deviceWidth = Dimensions.get('window').width

const FIXED_BAR_WIDTH = 280

const BAR_SPACE = 10



const images = [

  'http://www.seral-service.com/PicsRest/ImageNews/news1.jpg',

  'http://www.seral-service.com/PicsRest/ImageNews/news2.jpg',

  'http://www.seral-service.com/PicsRest/ImageNews/news3.jpg',

  'http://www.seral-service.com/PicsRest/ImageNews/news4.jpg',

]



export default class News extends Component {



  numItems = images.length

  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)

  animVal = new Animated.Value(0)



  render() {

    let imageArray = []

    let barArray = []

    images.forEach((image, i) => {

      console.log(image, i)

      const thisImage = (

        <Image

          key={`image${i}`}

          source={{uri: image}}

          style={{ width: deviceWidth}}

        />

      )

      imageArray.push(thisImage)



      const scrollBarVal = this.animVal.interpolate({

        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],

        outputRange: [-this.itemWidth, this.itemWidth],

        extrapolate: 'clamp',

      })



      const thisBar = (

        <View

          key={`bar${i}`}

          style={[

            styles.track,

            {

              width: this.itemWidth,

              marginLeft: i === 0 ? 0 : BAR_SPACE,

            },

          ]}

        >

          <Animated.View



            style={[

              styles.bar,

              {

                width: this.itemWidth,

                transform: [

                  { translateX: scrollBarVal },

                ],

              },

            ]}

          />

        </View>

      )

      barArray.push(thisBar)

    })



    return (

      <View

        style={styles.container}

        flex={1}

      >

        <ScrollView

          horizontal

          showsHorizontalScrollIndicator={false}

          scrollEventThrottle={10}

          pagingEnabled

          onScroll={

            Animated.event(

              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]

            )

          }

        >



          {imageArray}



        </ScrollView>

        <View

          style={styles.barContainer}

        >

          {barArray}

        </View>

      </View>

    )

  }

}





const styles = StyleSheet.create({

  container: {

    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

  },

  barContainer: {

    position: 'absolute',

    zIndex: 2,

    top: 40,

    flexDirection: 'row',

  },

  track: {

    backgroundColor: '#ccc',

    overflow: 'hidden',

    height: 2,

  },

  bar: {

    backgroundColor: '#5294d6',

    height: 2,

    position: 'absolute',

    left: 0,

    top: 0,

  },

})


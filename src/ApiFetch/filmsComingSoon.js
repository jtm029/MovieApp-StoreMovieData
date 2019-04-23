return (
    <View>
      <Text> Date: {FullDate} </Text>
      <Text>{films[8].film_name}</Text> 
     <Image source = {{uri: films[4].age_rating[0].age_rating_image}}
    style={{width: 157, height: 90}} />
      
      <Video source={{uri: films[1].film_trailer}}   // Can be a URL or a localfile.
     ref={(ref) => {
       this.player = ref
     }}                                      // Store reference
     onBuffer={this.onBuffer}                // Callback when remote video is buffering
     onEnd={this.onEnd}                      // Callback when playback finishes
     onError={this.videoError}               // Callback when video cannot be loaded
     style={{width: 157, height: 90}} />
    </View>
  );
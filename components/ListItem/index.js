import React, { Component } from "react";
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Platform,
  Animated,
  ToastAndroid
} from "react-native";
import PropTypes from "prop-types";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Button,Linking } from "react-native";
import { instance } from '../../utils/axiosConfig';

class ListItem extends Component {
  static propTypes = {
    leftElement: PropTypes.element,
    title: PropTypes.string,
    description: PropTypes.string,
    rightElement: PropTypes.element,
    rightText: PropTypes.number,
    onPress: PropTypes.func,
    onDelete: PropTypes.func,
    onLongPress: PropTypes.func,
    disabled: PropTypes.bool,
    data:PropTypes.string,
    from_user_id:PropTypes.string
  };

  
  renderRightAction = (iconName, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    });

    const pressHandler = () => {
      const { onDelete } = this.props;
      if (onDelete) onDelete();
      this.close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={{ color: "#fff" }}>Delete</Text>
        </RectButton>
      </Animated.View>
    );
  };

  renderRightActions = progress => (
    <View style={{ width: 64, flexDirection: "row" }}>
      {this.renderRightAction("trash", "#ef5350", 64, progress)}
    </View>
  );

  renderRightActions = progress => (
    <View style={{ width: 64, flexDirection: "row" }}>
      {this.renderRightAction("trash", "#ef5350", 64, progress)}
    </View>
  );

  updateRef = ref => {
    this.swipeableRow = ref;
  };

  close = () => {
    this.swipeableRow.close();
  };



  render() {
    const {
      leftElement,
      title,
      description,
      rightElement,
      rightText,
      onPress,
      onLongPress,
      disabled,
      data,
      from_user_id
    } = this.props;

    const Component = onPress || onLongPress ? TouchableHighlight : View;

    const {
      itemContainer,
      leftElementContainer,
      rightSectionContainer,
      mainTitleContainer,
      rightElementContainer,
      rightTextContainer,
      titleStyle,
      descriptionStyle
    } = styles;


    const InviteOrRequest=()=>{
    if(rightText=='Invite'){
      console.log("Invite called ji")
      Linking.openURL(`whatsapp://send?text=Welcome to My Bus Time. Download it!&phone=${description}`)
    }else{
      console.log("Request called ji",data)
      let obj={
        from_user:from_user_id,
        to_user:data
      }
      instance.post('/friend/send',obj).then(res=>{
        if(res.status==200){
          console.log("Sent sucess fully!");
          ToastAndroid.show('Request Sent,wait for accepting...', ToastAndroid.LONG);
        }
      })
    }
  }

    return (
      <Swipeable
        ref={this.updateRef}
        friction={1}
        renderRightActions={this.renderRightActions}
      >
        <Component
          onPress={onPress}
          onLongPress={onLongPress}
          disabled={disabled}
          underlayColor="#f2f3f5"
        >
          <View style={itemContainer}>
            {leftElement ? (
              <View style={leftElementContainer}>{leftElement}</View>
            ) : (
              <View />
            )}
            <View style={rightSectionContainer}>
              <View style={mainTitleContainer}>
                <Text style={titleStyle}>{title}</Text>
               
                {description ? (
                  <Text style={descriptionStyle}>{description}</Text>
                ) : (
                  <View />
                )}
              </View>
              <View style={rightTextContainer}>
              <Button title={rightText} style={{width:10}} onPress={()=>InviteOrRequest()} ></Button>
                {/* {rightText ? <Text>{rightText}</Text> : <View />} */}
              </View>

              {rightElement ? (
                <View style={rightElementContainer}>{rightElement}</View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </Component>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    minHeight: 44,
    height: 63
  },
  leftElementContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    paddingLeft: 13
  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: "row",
    flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#515151"
  },
  mainTitleContainer: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1
  },
  rightElementContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4
  },
  rightTextContainer: {
    justifyContent: "center",
    marginRight: 10
  },
  titleStyle: {
    fontSize: 16
  },
  descriptionStyle: {
    fontSize: 14,
    color: "#515151"
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

export default ListItem;

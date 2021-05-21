import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import GameCategory from "../screens/GameCategory";
import GamePlayers from "../screens/GamePlayers";
import ShuffleScreen from "../screens/ShuffleScreen";
import ChoosingPlayer from "../screens/ChoosingPlayer";
import GameBoard from "../screens/GameBoard";
import Question from "../screens/Question";
import AnswerQuestion from "../screens/AnswerQuestion";
import FeedbackScreen from "../screens/FeedbackScreen";
import TeacherScreen from "../screens/TeacherScore";
import ShowScore from "../screens/ShowScore";
import WinnerScreen from "../screens/WinnerScreen";

// Screen Stack Sequence
const screens = { 
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  GamePlayers: {
    screen: GamePlayers,
    navigationOptions: {
      headerShown: false,
    },
  },
  GameCategory: {
    screen: GameCategory,
    navigationOptions: {
      headerShown: false,
    },
  },
  ShuffleScreen: {
    screen: ShuffleScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ChoosingPlayer: {
    screen: ChoosingPlayer,
    navigationOptions: {
      headerShown: false,
    },
  },
  GameBoard: {
    screen: GameBoard,
    navigationOptions: {
      headerShown: false
    }
  },
  Question: {
    screen: Question,
    navigationOptions: {
      headerShown: false
    }
  },
  AnswerQuestion: {
    screen: AnswerQuestion,
    navigationOptions: {
      headerShown: false
    }
  },
  FeedbackScreen: {
    screen: FeedbackScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  TeacherScore: {
    screen: TeacherScreen,
    navigationOptions:{
      headerShown: false,
    },
  },  
  ShowScore: {
    screen: ShowScore,
    navigationOptions: {
      headerShown: false,
    },
  },
  WinnerScreen: {
    screen: WinnerScreen,
    navigationOptions: {
      headerShown: false
    }
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

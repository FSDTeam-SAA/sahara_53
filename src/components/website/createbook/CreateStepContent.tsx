import React from 'react'
import CreateBookMain from './CreateBookMain'
import StoryDetail from './StoryDetail'
import AddCharacters from './AddCharacters'
import YourStoryBeginning from './YourStoryBeginning'
import VoiceRecording from './voiceRecording'


const CreateStepContent = () => {
  return (
    <div>
       <CreateBookMain>
         {/* <StoryDetail /> */}
         {/* <AddCharacters /> */}
         {/* <YourStoryBeginning /> */}
          <VoiceRecording />
        </CreateBookMain>
    </div>
  )
}

export default CreateStepContent
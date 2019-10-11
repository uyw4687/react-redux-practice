import React from 'react'
import { shallow } from 'enzyme'
import CreateButtons from './CreateButtons'

describe('<CreateButtons />', () => {
    it('should render without errors', () => {
        const component = shallow(<CreateButtons isPreview={true}/>)
        const component2 = shallow(<CreateButtons isPreview={false}/>)
    })
})
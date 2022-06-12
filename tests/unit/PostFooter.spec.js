import { mount } from '@vue/test-utils'
import PostFooter from '@/components/PostHeader.vue'

describe("PostFooter.vue", () => {

    it('renders', () => {
        const wrapper = mount(PostFooter)

        expect(wrapper.exists()).toBe(true)
    })

    it('renders props.numberOfLikes when passed', () => {
        const wrapper = mount(PostFooter, {
          props: {
              numberOfLikes: 10
          }
        })
        expect(wrapper.find('p:nth-of-type(1)').text()).toMatch("10")
      })

    it('renders props.comments when passed', () => {
      const wrapper = mount(PostFooter, {
        props: {
            comments: 5
        }
      })
      expect(wrapper.find('p:nth-of-type(2)').text()).toMatch("5")
    })

    
})
import { mount } from '@vue/test-utils'
import PostHeader from '@/components/PostHeader.vue'

describe("PostHeader.vue", () => {
    
    it('renders', () => {
        const wrapper = mount(PostHeader)

        expect(wrapper.exists()).toBe(true)
    })
    
    it('renders props.profilePic when passed', () => {
      const wrapper = mount(PostHeader, {
        props: {
          profilePic: 'profile'
        }
      })
      expect(wrapper.find('img[alt="picture"]').attributes().src).toMatch("profile")
    })
    
    it('renders props.username when passed', () => {
      const wrapper = mount(PostHeader, {
        props: {
          username: "team3"
        }
      })
      expect(wrapper.find('p').text()).toMatch("team3")
    })
    
    it('renders props.created when passed', () => {
      const wrapper = mount(PostHeader, {
        props: {
          created: '08-05-2022'
        }
      })
      expect(wrapper.find('p').text()).toMatch("08-05-2022")
    })
    
    it('renders props.socialMedia when passed', () => {
        const wrapper = mount(PostHeader, {
          props: {
            socialMedia: 'Social'
          }
        })
        expect(wrapper.find('img[alt="SoMe"]').attributes().src).toMatch("Social")
      })
})
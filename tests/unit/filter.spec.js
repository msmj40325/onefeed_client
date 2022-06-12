import { mount } from '@vue/test-utils'
import JestTest from '@/components/JestTest.vue'
import PostHeader from '@/components/PostHeader.vue'

test('trigger', async () => {
    const wrapper = mount(JestTest)

    expect(wrapper.$data).toBe(false)
  
    await wrapper.find('button').trigger('click')
  
    expect(wrapper.setData.filtered).toBe(true)
  })


/*describe("PostHeader.vue", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(PostHeader)
    })
    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })
})*/




/*example.spec.js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})*/
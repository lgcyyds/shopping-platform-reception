import banner from './banners.json'
import floor from './floors.json'
import Mock from 'mockjs'

Mock.mock('/mock/banner',{code:200,data:banner});
Mock.mock('/mock/floor',{code:200,data:floor});

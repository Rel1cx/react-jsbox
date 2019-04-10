import view from './view'
import label from './label'
import scroll from './scroll'

export const Components = {view, label, scroll}
export const hasComponent = type => Object.hasOwnProperty.call(Components, type)

import { Model, model, modelAction, prop } from "mobx-keystone";

@model("cloudApp/SidebarStore")
class SideBarStore extends Model({
    activeTabId: prop<number>()

}) {
    @modelAction
    setTab(id: number) {
        this.activeTabId = id
    }
}

export const sideBarStore = new SideBarStore({ activeTabId: 0 })

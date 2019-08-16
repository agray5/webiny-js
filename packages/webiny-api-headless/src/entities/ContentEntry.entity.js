// @flow
import { Entity } from "webiny-entity";

export interface IContentEntry extends Entity {
    createdBy: ?Entity;
    modelId: string;
    data: Object;
}

export function contentEntryFactory(context: Object): Class<IContentEntry> {
    return class ContentEntry extends Entity {
        static classId = "CmsContentEntry";

        createdBy: ?Entity;
        modelId: string;
        data: Object;

        constructor() {
            super();

            const { getUser, getEntity } = context;

            this.attr("createdBy")
                .entity(getEntity("SecurityUser"))
                .setSkipOnPopulate();

            this.attr("modelId")
                .char()
                .setValidators("required");
            this.attr("data")
                .object()
                .setValue({});

            this.on("beforeCreate", async () => {
                this.createdBy = getUser();
            });
        }
    };
}
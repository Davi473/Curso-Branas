import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils";
import App from "../App.vue";
import { AccountGatewayHttp, AccountGatewayMemory } from "@/AccountGateway";

function sleep (time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

describe("App.vue", () => {
    it ("Deve criar uma conta", async () => {
        const accountGateway = new AccountGatewayMemory();
        const wrapper = mount(App, { 
            global: {
                provide: {
                    accountGateway
                }
            }
        });
        const input = {
            name: "John Doe",
            email: "john.doe@gmail.com",
            document: "97456321558",
            password: "asdQWE123"
        }
        await wrapper.get(".input-name").setValue(input.name);
        await wrapper.get(".input-email").setValue(input.email);
        await wrapper.get(".input-document").setValue(input.document);
        await wrapper.get(".input-password").setValue(input.password);
        await wrapper.get(".button-signup").trigger("click");
        await sleep(200);
        expect(wrapper.get(".span-message").text()).toBe("success");
        expect(wrapper.get(".span-account-id").text()).toBeDefined();
    });

    it ("Não deve criar uma conta se o nome for inválido", async () => {
        const accountGateway = new AccountGatewayMemory();
        const wrapper = mount(App, { 
            global: {
                provide: {
                    accountGateway
                }
            }
        });
        const input = {
            name: "John",
            email: "john.doe@gmail.com",
            document: "97456321558",
            password: "asdQWE123"
        }
        await wrapper.get(".input-name").setValue(input.name);
        await wrapper.get(".input-email").setValue(input.email);
        await wrapper.get(".input-document").setValue(input.document);
        await wrapper.get(".input-password").setValue(input.password);
        await wrapper.get(".button-signup").trigger("click");
        await sleep(200);
        expect(wrapper.get(".span-message").text()).toBe("Invalid name");
    });

    it.only("Deve percorrer o fluxo de criação de conta", async () => {
        const accountGateway = new AccountGatewayMemory();
        const wrapper = mount(App, {
            global: {
                provide: {
                    accountGateway
                }
            }
        });
        expect(wrapper.get(".span-step").text()).toBe("1");
        expect(wrapper.find(".input-password").exists()).toBe(false);
        expect(wrapper.find(".button-previous").exists()).toBe(false);
        expect(wrapper.find(".button-submit").exists()).toBe(false);
        expect(wrapper.get(".span-progress").text()).toBe("0%");
        await wrapper.get(".button-next").trigger("click");
        expect(wrapper.get(".span-step").text()).toBe("1");
        expect(wrapper.get(".span-message").text()).toBe("Name is required");
        await wrapper.get(".input-name").setValue("John Doe");
        expect(wrapper.get(".span-progress").text()).toBe("25%");
        await wrapper.get(".button-next").trigger("click");
        expect(wrapper.get(".span-step").text()).toBe("1");
        expect(wrapper.get(".span-message").text()).toBe("Email is required");
        await wrapper.get(".input-email").setValue("john.doe@gmail.com");
        expect(wrapper.get(".span-progress").text()).toBe("50%");
        await wrapper.get(".button-next").trigger("click");
        expect(wrapper.get(".span-step").text()).toBe("1");
        expect(wrapper.get(".span-message").text()).toBe("Document is required");
        await wrapper.get(".input-document").setValue("97456321558");
        expect(wrapper.get(".span-progress").text()).toBe("75%");
        await wrapper.get(".button-next").trigger("click");
        expect(wrapper.get(".span-step").text()).toBe("2");
        expect(wrapper.find(".button-next").exists()).toBe(false);
        expect(wrapper.get(".span-message").text()).toBe("");
        expect(wrapper.find(".input-name").exists()).toBe(false);
        expect(wrapper.find(".input-email").exists()).toBe(false);
        expect(wrapper.find(".input-document").exists()).toBe(false);
        await wrapper.get(".button-signup").trigger("click");
        expect(wrapper.get(".span-message").text()).toBe("Password is required");
        await wrapper.get(".input-password").setValue("asdQWE123");
        expect(wrapper.get(".span-progress").text()).toBe("75%");
        await wrapper.get(".input-confirm-password").setValue("asdQ");
        expect(wrapper.get(".span-progress").text()).toBe("75%");
        await wrapper.get(".button-signup").trigger("click");
        expect(wrapper.get(".span-message").text()).toBe("Password and confirm password must match");
        await wrapper.get(".input-confirm-password").setValue("asdQWE123");
        expect(wrapper.get(".span-progress").text()).toBe("100%");
        await wrapper.get(".button-signup").trigger("click");
        await sleep(200);
        expect(wrapper.get(".span-message").text()).toBe("success");
    });
});
// made by ET
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { command } from "bdsx/command";
import { Form } from "bdsx/bds/form";



// 코드 시작

events.packetBefore(MinecraftPacketIds.Text).on((ptr, ni, id) => {
    const actor = ni.getActor()!;
    const username = actor.getName()

    let message = ptr.message.replace(/"/gi, `''`);
    bedrockServer.executeCommand(`execute @a[name="${ptr.name}",tag=!"근접채팅",tag=!"전채채팅"] ~ ~ ~ tellraw @a {"rawtext":[{"text":"§l§f[ §7일반채팅§f ]§f §r${ptr.name}§r ${message}"}]}`);
    bedrockServer.executeCommand(`execute @a[name="${ptr.name}",tag="근접채팅"] ~ ~ ~ tellraw @p {"rawtext":[{"text":"§l§f[ §6근접채팅§f ]§f §r${ptr.name}§r ${message}"}]}`);
    bedrockServer.executeCommand(`execute @a[name="${ptr.name}",tag="전채채팅"] ~ ~ ~ tellraw @a {"rawtext":[{"text":"§l§f[ §e전체채팅§f ]§f §r${ptr.name}§r ${message}"}]}`);
    return CANCEL;
});


command.register('전채채팅', `모든 사람이 당신의 채팅을 볼 수 있습니다.`).overload(async (p, o, op) => {
    const actor = o.getEntity();
    if (!actor?.isPlayer()) {
        return;

    }
    const name = o.getName();
    const ni = actor.getNetworkIdentifier();
    const isYes = await Form.sendTo(ni, {
        type: `modal`,
        title: `§l채팅`,
        content: `§l전채 채팅을 사용하시겠습니까?`,
        button1: `§l네`,
        button2: `§l아니요`,
    });
    if (isYes) {
        bedrockServer.executeCommand(`tag "${name}" add "전채채팅"`)
    }
    if (isYes) {
        bedrockServer.executeCommand(`tag "${name}" remove "근쳐채팅"`)
    }
}, {});

command.register('근접채팅', `근쳐에 있는 유저들만 당신의 채팅을 볼 수 있게합니다.`).overload(async (p, o, op) => {
    const actor = o.getEntity();
    if (!actor?.isPlayer()) {
        return;

    }
    const name = o.getName();
    const ni = actor.getNetworkIdentifier();
    const isYes = await Form.sendTo(ni, {
        type: `modal`,
        title: `§l채팅`,
        content: `§l근접 채팅을 사용하시겠습니까?`,
        button1: `§l네`,
        button2: `§l아니요`,
    });
    if (isYes) {
        bedrockServer.executeCommand(`tag "${name}" add "근접채팅"`)
    }
    if (isYes) {
        bedrockServer.executeCommand(`tag "${name}" remove "전채채팅"`)
    }
}, {});

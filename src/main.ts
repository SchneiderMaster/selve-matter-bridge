import { MaybePromise, ServerNode } from "@matter/main";
import { GenericSwitchDevice, GenericSwitchRequirements } from "@matter/main/devices";

class def extends GenericSwitchRequirements.SwitchServer {
	override initialize(_options?: {}): MaybePromise {
		this.state.numberOfPositions = 2;
		this.state.currentPosition = 1;
		}

}

const abc = GenericSwitchDevice.with(def);

const node = await ServerNode.create();

const ghi = await node.add(abc);

function onOff(state: number) {
	state = state === 0 ? 1 : 0;
	ghi.setStateOf(def, {currentPosition: state})
	setTimeout(() => onOff(state), 5000)
}

onOff(0);

await node.run();

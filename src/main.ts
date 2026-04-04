import { MaybePromise, ServerNode } from "@matter/main";
import { WindowCoveringBehavior } from "@matter/main/behaviors";
import { WindowCovering } from "@matter/main/clusters";
import { WindowCoveringDevice } from "@matter/main/devices";
import { moveDown } from "./commeo-api-provider/move-down.js";
import { moveTo } from "./commeo-api-provider/move-to.js";
import { stop } from "./commeo-api-provider/stop.js";
import { moveUp } from "./commeo-api-provider/move-up.js";
import { initAllDevices } from "./commeo-api-provider/initAllDevices.js";
import { CommeoShutter } from "./commeo-api-provider/CommeoShutter.js";

class John extends WindowCoveringBehavior.with(
	WindowCovering.Feature.Lift,
	WindowCovering.Feature.PositionAwareLift
) {
	override async downOrClose() {
		console.log(
			"we are closing",
			this.state.currentPositionLiftPercent100ths
		);
		// moveDown("0B");

		this.state.targetPositionLiftPercent100ths = 0;
	}

	override goToLiftPercentage(
		request: WindowCovering.GoToLiftPercentageRequest
	): MaybePromise {
		// moveTo("0B", Math.floor(request.liftPercent100thsValue / 100));

		this.state.targetPositionLiftPercent100ths = request.liftPercent100thsValue;
	}

	override stopMotion() {
		stop("0B");
		this.state.targetPositionLiftPercent100ths = this.state.currentPositionLiftPercent100ths;
	}

	override async upOrOpen() {
		console.log(
			"we are opening",
			this.state.currentPositionLiftPercent100ths
		);
		moveUp("0B");
	}

	override initialize() {
		this.state.currentPositionLiftPercent100ths = 0;
	}
}

const commeoShutters: CommeoShutter[] = await initAllDevices();


console.log(commeoShutters.length);

// const testingShutter = WindowCoveringDevice.with(John);

// const node = await ServerNode.create();

// await node.add(testingShutter);

// await node.run();

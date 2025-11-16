import { MaybePromise, ServerNode } from "@matter/main";
import { WindowCoveringBehavior } from "@matter/main/behaviors";
import { WindowCovering } from "@matter/main/clusters";
import { WindowCoveringDevice } from "@matter/main/devices";
import { moveDown } from "./commeo-api-provider/move-down.js";
import { moveTo } from "./commeo-api-provider/move-to.js";
import { stop } from "./commeo-api-provider/stop.js";
import { moveUp } from "./commeo-api-provider/move-up.js";

class John extends WindowCoveringBehavior.with(
	WindowCovering.Feature.Lift,
	WindowCovering.Feature.PositionAwareLift
) {
	override async downOrClose() {
		console.log(
			"we are closing",
			this.state.currentPositionLiftPercent100ths
		);
		moveDown("0B");
	}

	override goToLiftPercentage(
		request: WindowCovering.GoToLiftPercentageRequest
	): MaybePromise {
		this.state.currentPositionLiftPercent100ths =
			request.liftPercent100thsValue;
		moveTo("0B", Math.floor(request.liftPercent100thsValue / 100));
	}

	override stopMotion() {
		stop("0B");
	}

	override async upOrOpen() {
		console.log(
			"we are opening",
			this.state.currentPositionLiftPercent100ths
		);
		moveUp("0B");
	}

	override initialize() {}
}

const testingShutter = WindowCoveringDevice.with(John);

const node = await ServerNode.create();

await node.add(testingShutter);

await node.run();

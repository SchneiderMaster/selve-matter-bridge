import { MaybePromise, ServerNode } from "@matter/main";
import { WindowCoveringBehavior } from "@matter/main/behaviors";
import { WindowCovering } from "@matter/main/clusters";
import { WindowCoveringDevice } from "@matter/main/devices";

class John extends WindowCoveringBehavior.with(
	WindowCovering.Feature.Lift,
	WindowCovering.Feature.PositionAwareLift
) {
	override async downOrClose() {
		console.log(
			"we are closing",
			this.state.currentPositionLiftPercent100ths
		);
		this.state.currentPositionLiftPercent100ths = 10000;
	}

	override goToLiftPercentage(
		request: WindowCovering.GoToLiftPercentageRequest
	): MaybePromise {
		this.state.currentPositionLiftPercent100ths =
			request.liftPercent100thsValue;
	}

	override stopMotion(): MaybePromise {}

	override async upOrOpen() {
		console.log(
			"we are opening",
			this.state.currentPositionLiftPercent100ths
		);
		this.state.currentPositionLiftPercent100ths = 0;
	}

	override initialize() {}
}

const testingShutter = WindowCoveringDevice.with(John);

const node = await ServerNode.create();

await node.add(testingShutter);

await node.run();

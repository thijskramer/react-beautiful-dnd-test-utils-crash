import React from "react";
import { render, within } from "@testing-library/react";
import {
  mockGetComputedSpacing,
  mockDndElSpacing,
  makeDnd,
  DND_DRAGGABLE_DATA_ATTR,
  DND_DIRECTION_DOWN,
  DND_DIRECTION_UP,
} from "react-beautiful-dnd-test-utils";
import { Container } from "../Container";
import { initialData } from '../initialdata';

const createTestTextOrderByTestIdHelper = (getAllByTestId) => {
  const testTextOrderByTestId = (testId, expectedTexts) => {
    const texts = getAllByTestId(testId).map((x) => x.textContent);
    expect(texts).toEqual(expectedTexts);
  };
  return testTextOrderByTestId;
};

const renderContainer = () => {
  const rtlUtils = render(<Container initialMedia={initialData} />);

  mockDndElSpacing(rtlUtils);

  const makeGetDragEl = (text) => () => {
    return rtlUtils.getByText(text).closest(DND_DRAGGABLE_DATA_ATTR);
  };

  return { makeGetDragEl, ...rtlUtils };
};

describe("Media sorting", () => {
  beforeEach(() => {
    mockGetComputedSpacing();
  });

  describe("dnd", () => {
    test("moves a media item down", async () => {
      const { getByText, getByTestId, makeGetDragEl } = renderContainer();

      // makeDnd crashes!
      await makeDnd({
        getByText,
        getDragEl: makeGetDragEl("Memora"),
        direction: DND_DIRECTION_DOWN,
        positions: 2,
      });

    //   const { getAllByTestId: getAllByTestIdWithinColumn } = within(
    //     getByTestId("media")
    //   );
    //   const testTextOrderByTestId = createTestTextOrderByTestIdHelper(
    //     getAllByTestIdWithinColumn
    //   );
    //   testTextOrderByTestId("media", [
    //     "Watch my favorite show",
    //     "Charge my phone",
    //     "Take out the garbage",
    //     "Cook dinner",
    //   ]);
    });

    // test("moves a task up inside a column", async () => {
    //   const { getByText, getByTestId, makeGetDragEl } = renderApp();

    //   await makeDnd({
    //     getByText,
    //     getDragEl: makeGetDragEl("Cook dinner"),
    //     direction: DND_DIRECTION_UP,
    //     positions: 1,
    //   });

    //   const { getAllByTestId: getAllByTestIdWithinColumn } = within(
    //     getByTestId("to-do-column")
    //   );
    //   const testTextOrderByTestId = createTestTextOrderByTestIdHelper(
    //     getAllByTestIdWithinColumn
    //   );
    //   testTextOrderByTestId("task-content", [
    //     "Take out the garbage",
    //     "Watch my favorite show",
    //     "Cook dinner",
    //     "Charge my phone",
    //   ]);
    // });
  });
});

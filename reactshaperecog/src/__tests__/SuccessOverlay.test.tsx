import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuccessOverlay from '../components/SuccessOverlay';
import { NetworkingManager } from '../networking/NetworkingManager';
import { Message } from "../schema/wsschema/message";

const mockOn = jest.fn();
const mockOff = jest.fn();
const mockNetworkingManager = {
    on: mockOn,
    off: mockOff
} as unknown as NetworkingManager;

const mockPlay = jest.fn();

beforeEach(() => {
    global.Audio = jest.fn().mockImplementation(() => ({
        play: mockPlay
    }));

    jest.clearAllMocks();
});

describe('SuccessOverlay Component', () => {
    test('should render correctly with provided props', () => {
        render(<SuccessOverlay inNetworkingManager={ mockNetworkingManager } />);
        expect(screen.getByTestId('success-overlay')).toBeInTheDocument();
    });

    // PSA: Test cases involving message types are deprecated as of the writing of this comment since they were commented out in corresponding component file

    // test('should register event listeners on mount', () => {
    //     render(<SuccessOverlay inNetworkingManager={ mockNetworkingManager } />);
    //     expect(mockOn).toHaveBeenCalledWith(Message.ScoreUpdateResponse.toString(), expect.any(Function));
    // });

    // test('should unregister event listeners on unmount', () => {
    //     const { unmount } = render(<SuccessOverlay inNetworkingManager={ mockNetworkingManager }/>);
    //     unmount();
    //     expect(mockOff).toHaveBeenCalledWith(Message.ScoreUpdateResponse.toString(), expect.any(Function));
    // });

    // test('should update overlay visibility when event is triggered', async () => {
    //     const { container } = render(<SuccessOverlay inNetworkingManager={ mockNetworkingManager }/>);
    //     expect(container.firstChild).toHaveStyle('display: none');

    //     mockOn.mockImplementation((event, callback) => {
    //         if (event === Message.ScoreUpdateResponse.toString()) {
    //             callback(1);
    //         }
    //     });

    //     mockOn.mock.calls.forEach(([event, callback]) => {
    //         if (event === Message.ScoreUpdateResponse.toString()) {
    //             act(() => callback(1));
    //         }
    //     });

    //     await waitFor(() => expect(container.firstChild).toHaveStyle('display: block'));
    //     // console.log('Display style after waitFor (should be block):', container.firstChild instanceof Element ? getComputedStyle(container.firstChild).display : 'Not an element');
    //     await waitFor(() => expect(container.firstChild).toHaveStyle('display: none'));
    //     // console.log('Display style after waitFor (should be none):', container.firstChild instanceof Element ? getComputedStyle(container.firstChild).display : 'Not an element');
    // });

    // test('should play sound when score is positive',  async () => {
    //     render(<SuccessOverlay inNetworkingManager={ mockNetworkingManager }/>);

    //     mockOn.mockImplementationOnce((event, callback) => {
    //         if (event === Message.ScoreUpdateResponse.toString()) {
    //             callback(1);
    //         }
    //     });

    //     mockOn.mock.calls.forEach(([event, callback]) => {
    //         if (event === Message.ScoreUpdateResponse.toString()) {
    //             act(() => callback(1));
    //         }
    //     });

    //     // audio playback logic is executed as soon as component mounts, meaning it already gets called once when component is rendered
    //     await waitFor(() => expect(mockPlay).toHaveBeenCalledTimes(2));
    // });

    // test('should play sound when score is negative', async () => {
    //     render(<SuccessOverlay inNetworkingManager={ mockNetworkingManager }/>);

    //     mockOn.mockImplementationOnce((event, callback) => {
    //         if (event == Message.ScoreUpdateResponse.toString()) {
    //             callback(1);
    //         }
    //     });

    //     mockOn.mock.calls.forEach(([event, callback]) => {
    //         if (event == Message.ScoreUpdateResponse.toString()) {
    //             act(() => callback(1));
    //         }
    //     });

    //     // audio playback logic is executed as soon as component mounts, meaning it already gets called once when component is rendered
    //     await waitFor(() => expect(mockPlay).toHaveBeenCalledTimes(2));
    // });

    // test('should not trigger haptic feedback if not supported', () => {
    //     render(<SuccessOverlay inNetworkingManager={ mockNetworkingManager }/>);

    //     mockOn.mockImplementationOnce((event, callback) => {
    //         if (event == Message.ScoreUpdateResponse.toString()) {
    //             callback(1);
    //         }
    //     });

    //     mockOn.mock.calls.forEach(([event, callback]) => {
    //         if (event == Message.ScoreUpdateResponse.toString()) {
    //             act(() => callback(1));
    //         }
    //     });

    //     expect(navigator.vibrate).toBeUndefined();
    // });

    // test('should trigger haptic feedback if supported', async () => {
    //     navigator.vibrate = jest.fn();

    //     render(<SuccessOverlay inNetworkingManager={ mockNetworkingManager }/>);

    //     mockOn.mockImplementationOnce((event, callback) => {
    //         if (event == Message.ScoreUpdateResponse.toString()) {
    //             callback(1);
    //         }
    //     });

    //     mockOn.mock.calls.forEach(([event, callback]) => {
    //         if (event == Message.ScoreUpdateResponse.toString()) {
    //             act(() => callback(1));
    //         }
    //     });

    //     await waitFor(() => {
    //         expect(navigator.vibrate).toHaveBeenCalledWith(100);
    //         expect(navigator.vibrate).toHaveBeenCalledTimes(2);
    //     });
    // });
});
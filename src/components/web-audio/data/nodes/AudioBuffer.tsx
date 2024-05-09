import { Component } from "react";
import { audio } from "../../library/audio";
import { context } from "../../context";

@audio()
export class AudioBuffer extends Component {
  input = context.createGain();
  output = context.createGain();
}
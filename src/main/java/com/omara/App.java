package com.omara;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class App extends Application {

    private static Scene scene;
    private static Font arial;
    private static Button button;

    @Override
    public void start(Stage primaryStage) throws Exception {
        primaryStage.setTitle("SVG 4 Me");
        button = new Button();
        arial = new Font("arial", 20);
        button.setFont(arial);
        button.setText("Switch to Secondary");

        StackPane layout = new StackPane();
        layout.getChildren().add(button);

        scene = new Scene(layout, 300, 250);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }

}